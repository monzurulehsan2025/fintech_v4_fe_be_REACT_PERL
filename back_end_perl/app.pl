#!/usr/bin/env perl
use Mojolicious::Lite;
use Mojo::JSON qw(decode_json encode_json);
use Mojo::File qw(path);
use Mojo::Util qw(decode);

# Enable CORS
hook after_dispatch => sub {
    my $c = shift;
    $c->res->headers->header('Access-Control-Allow-Origin' => '*');
    $c->res->headers->header('Access-Control-Allow-Methods' => 'GET, POST, OPTIONS');
    $c->res->headers->header('Access-Control-Allow-Headers' => 'Content-Type, Authorization');
};

# Handle OPTIONS requests for CORS preflight
options '*' => sub {
    my $c = shift;
    $c->render(text => '', status => 204);
};

# Main data endpoint with pagination
get '/api/data' => sub {
    my $c = shift;
    my $page = $c->param('page') || 1;
    my $limit = $c->param('limit') || 10;
    
    my $file_path = path(__FILE__)->sibling('data', 'mockData.json');
    
    if (-e $file_path) {
        my $json_text = $file_path->slurp;
        my $full_data = decode_json($json_text);
        
        # Convert summary object to an ordered array for stable pagination
        my @all_metrics = map { { key => $_, value => $full_data->{summary}->{$_} } } sort keys %{$full_data->{summary}};
        
        my $total_items = scalar @all_metrics;
        my $total_pages = int(($total_items + $limit - 1) / $limit);
        
        my $start_idx = ($page - 1) * $limit;
        my $end_idx = $start_idx + $limit - 1;
        $end_idx = $total_items - 1 if $end_idx >= $total_items;
        
        my @sliced_metrics = @all_metrics[$start_idx .. $end_idx];
        
        $c->render(json => {
            summary => \@sliced_metrics,
            pagination => {
                totalItems => $total_items,
                totalPages => $total_pages,
                currentPage => int($page),
                limit => int($limit)
            }
        });
    } else {
        $c->render(json => { error => 'Data file not found' }, status => 404);
    }
};

# Banner image endpoint
get '/api/banner' => sub {
    my $c = shift;
    $c->reply->static('banner.png');
};

# Status endpoint
get '/api/status' => sub {
    my $c = shift;
    $c->render(json => { status => 'online', backend => 'Perl Mojolicious' });
};

app->start;

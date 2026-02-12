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

# Main data endpoint
get '/api/data' => sub {
    my $c = shift;
    my $file_path = path(__FILE__)->sibling('data', 'mockData.json');
    
    if (-e $file_path) {
        my $json_text = $file_path->slurp;
        my $data = decode_json($json_text);
        $c->render(json => $data);
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

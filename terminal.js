$(function (){
    $('body').terminal({
        name: function(){
            this.echo('Robin');
        },
        hi: function(){
            this.echo('hi');
        },
        start: function(){
            this.echo('Welcome to the game.')
        }

    }, {
        greetings: 'Hello Robin.\n' +
        'Type [[b;#fff;]start] to begin.',
        prompt: '> '
    });
})
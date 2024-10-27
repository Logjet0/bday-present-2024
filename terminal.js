$(function (){
    $('body').terminal({
        name: function(){
            this.echo('Robin');
        },
        hi: function(){
            this.echo('hi');
        }

    }, {
        greetings: 'Hello Robin. Welcome to !@*(!*@(#&)!',
        prompt: '> '
    });
})
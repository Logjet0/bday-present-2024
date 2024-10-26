$(function (){
    $('body').terminal({
        name: function() {
            this.echo('Robin');
        }
    }, {
        other: 'UNDEFINED'
    });
})
const React = require('react')
class Show extends React.Component {
    render() {
        const fruit = this.props.fruit;
        return (
            <div>
                <h1> Fruits Show Page </h1>
                The {fruit.name} is {fruit.color} and
                {fruit.readyToEat ? ' It is ready to eat' : ' Nope, it is not good to eat'}
                <nav>
                    <a href="/fruits">Main Fruits Page</a>
                </nav>
                <form action={`/fruits/${fruit.id}`} method="POST">
                    <input type="submit" name='' value="Delete Fruit"/>   
                </form>
            </div>

        );
    }
};
module.exports = Show;




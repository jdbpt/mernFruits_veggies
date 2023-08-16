const React = require('react')
class Show extends React.Component {
    render() {
        const fruit = this.props.fruit;
        return (
            <div>
                <h1> Fruits Show Page </h1>
                The {fruit.name} is {fruit.color} and
                {fruit.readyToEat ? ' It is ready to eat' : ' Nope, it is not good to eat'}
            </div>

        );
    }
};
module.exports = Show;




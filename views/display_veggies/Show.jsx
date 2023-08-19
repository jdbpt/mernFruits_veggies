const React = require('react')
class Show extends React.Component {
    render() {
        const veggie = this.props.veggie;
        return (
            <div>
                <h1> Veggies Show Page </h1>
                The {veggie.name} is {veggie.color} and
                {veggie.readyToEat ? ' It is ready to eat' : ' Nope, it is not good to eat'}
                <nav>
                    <a href="/veggies">Main Veggies Page</a>
                </nav>
            </div>

        );
    }
};
module.exports = Show;




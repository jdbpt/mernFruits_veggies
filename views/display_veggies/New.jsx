const React = require('react');

class New extends React.Component {
    render() {
        return (
            <div>
                <h1>Create Veggies Page</h1>
                {/* action= route, method=HTTP verb */}
                <form action='/veggies' method="POST">
                    Name: <input type='text' name="name"/><br/>
                    Color: <input type='text' name="color"/><br/>
                    Is Ready To Eat: <input type="checkbox" name="readyToEat"/><br/>
                    <input type="submit" name='' value="Create Veggie"/>   
                </form>
                <nav style={{padding: "10px"}}>
                    <a href="/veggies">Main Veggies Page</a>
                </nav>
            </div>
        );
    }
};//end New

module.exports = New;
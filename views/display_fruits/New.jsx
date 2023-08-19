const React = require('react');

class New extends React.Component {
    render() {
        return (
            <div>
                <h1>Create Fruits Page</h1>
                {/* action= route, method=HTTP verb */}
                <form action='/fruits' method="POST">
                    Name: <input type='text' name="name"/><br/>
                    Color: <input type='text' name="color"/><br/>
                    Is Ready To Eat: <input type="checkbox" name="readyToEat"/><br/>
                    <input type="submit" name='' value="Create Fruit"/>   
                </form>
                <nav style={{padding: "10px"}}>
                    <a href="/fruits">Main Fruits Page</a>
                </nav>
            </div>
        );
    }
};//end New

module.exports = New;
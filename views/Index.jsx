const React = require('react');

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    return (
      <div>
        <h1>Fruits Index Page</h1>

        <ul>
            {fruits.map((fruit, i)=>{
                return(
                  <li>
                    The{' '}
                    <a href={`/fruits/${i}`}>{fruit.name}</a>
                    {' '}
                    is {fruit.color}<br/>
                    {fruit.readyToEat ? 'It is ready to eat' : 'Nope, it is not good to eat'}
                    <br/>
                  </li>  
                )//return
            })}
        </ul>
      </div>
    )
  }
};

module.exports = Index;

const React = require('react');

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    return (
      <div>
        <h1>Fruits Index Page</h1>
        <nav style={{padding: "10px"}}>
          <p><a href="/">Home</a></p>
          <p><a href="/fruits/new">Create a New Fruit</a></p>
        </nav>
        <ul>
            {fruits?.map((fruit, i)=>{
                return(
                  <li key={i}>
                    The{' '}
                    {/**Make sure it is calling fruit.id */}
                    <a href={`/fruits/${ fruit.id }`}>{fruit.name}</a>
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

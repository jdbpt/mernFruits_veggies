const React = require('react');

class Index extends React.Component {
  render() {
    const { veggies } = this.props;
    return (
      <div>
        <h1>Veggies Index Page</h1>
        <nav style={{padding: "10px"}}>
          <p><a href="/">Home</a></p>
          <p><a href="/veggies/new">Create a New Veggie</a></p>
        </nav>
        <ul>
            {veggies?.map((veggie, i)=>{
                return(
                  <li key={i}>
                    The{' '}
                    {/**Make sure it is calling veggie.id */}
                    <a href={`/veggies/${ veggie.id }`}>{veggie.name}</a>
                    {' '}
                    is {veggie.color}<br/>
                    {veggie.readyToEat ? 'It is ready to eat' : 'Nope, it is not good to eat'}
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

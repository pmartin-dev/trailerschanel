import React,{Component} from 'react';

class SearchBar extends Component{
   constructor(props){
      super(props);
      this.state = {
         searchText:'',
         placeHolder:'Tappez votre film...',
      }
   }

   handleChange(e){
      this.setState({searchText:e.currentTarget.value})
   }

   render() {
    return (
      <div>
         <input onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
         
      </div>
    )}
    
}

export default SearchBar;
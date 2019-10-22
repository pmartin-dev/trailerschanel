import React,{Component} from 'react';

class SearchBar extends Component{
   constructor(props){
      super(props);
      this.state = {
         searchText:'',
         placeHolder:'Rechercher une bande-annonce...',
      }
   }

   handleChange(e){
      this.setState({searchText:e.currentTarget.value})
   }

   handleOnClick(e){
      this.props.callback(this.state.searchText)
   }

   render() {
    return (
      <div className="row">
         <div className="col-md-8 input-group">
             <input type="text" className="form-control input-lg" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
             <span className="input-group-btn">
                <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}>Go</button>
             </span>
         </div>
      </div>
    )}
    
}

export default SearchBar;
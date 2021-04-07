import React, { Component } from 'react'
import Car from './Car'
import axios from 'axios';


export class CarList extends Component {

    state={
        plaka:"",
        marka:"",
        model:"",
       
    }


    
   handleAdd=(event)=>{
       event.preventDefault();
       
         
       axios.post(`http://localhost:8080/api/cars`, { 
        
       plaka:this.state.plaka,
       marka:this.state.marka,
       model:this.state.model },{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
       .then(res => {
         console.log(res);
         console.log(res.data);
    
       })
      
   }
   handleChangePlaka=(e)=>{
       
    this.setState({plaka:e.target.value})
   }
   handleChangeMarka=(e)=>{
    this.setState({marka:e.target.value})
   }
   handleChangeModel=(e)=>{
    this.setState({model:e.target.value})
   }
    render() {
        return (

            <div className="container" style={{backgroundColor:'#E8F6F3'}}>
                <form onSubmit={this.handleAdd} >
                    <div style={{padding:10 }} > 
                    <nav className="navbar navbar-light bg-light" >
                            <span className="navbar-text" >
                                Car Project
                            </span>
                        </nav>
                    </div>
                    <div className="row" style={{padding:10,paddingTop:20}}>
                        <div className="col-8">
                            <div className="card shadow-sm">
                              
                                <input type="text" 
                                className="form-control" 
                                placeholder="Plaka"
                                onChange={this.handleChangePlaka}/>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{padding:10,paddingTop:20}}>
                        <div className="col-8">
                            <input type="text" 
                            className="form-control" 
                            placeholder="Marka"
                            onChange={this.handleChangeMarka}/>
                        </div> 
                    </div>
                    <div className="row" style={{padding:10,paddingTop:20}}>
                        <div className="col-8">
                            <input type="text" 
                            className="form-control" 
                            placeholder="Model"
                            onChange={this.handleChangeModel}/>
                        </div>
                    </div>                    
                    <button style={{margin :10,width:200}} type="submit" className="btn btn-outline-success">Ekle</button>
                    
                  
                   <hr style={{marginBottom:5,marginTop:5,backgroundColor:"black",borderColor:"transparent"}}></hr>

               </form>
               
                        
                <Car getCars={this.state.getCars}/>
                    
               
              
            </div>
           
            
        )
    }
}

export default CarList

import axios from 'axios'
import React, { Component } from 'react'


export class Car extends Component {
  
    state={
        cars:[]
        
    }
  
 componentDidMount(){
        this.getCars();
        
             
        axios.delete("/606d59a6f10e75b660de08f6").then(res=>
              console.log(res)
          )
      
        

}

      getCars(){
          axios.get(`http://localhost:8080/api/cars`)
          .then(res => {
          const cars= res.data;
          this.setState({cars});
          })

      }
      // silme ve ekleme işlemi yapılınca aksiyonu direk yap
      //deleti on click haline getir

  

    render() {
        return (
            <div className="row" style={{padding:10}}>     

{ this.state.cars.map((car => <div className="col-sm-4"key={car._id}style={{padding:10}}>
            <div className="card" style={{backgroundColor:'#AED6F1'}}>
                <div className="card-body">
                   
                    <h5 className="card-title"><span className="badge badge-secondary">Plaka : {car.plaka}  </span></h5>
                    <h5 className="card-title"><span className="badge badge-secondary">Marka: {car.marka}</span></h5>
                    <h5 className="card-title"><span className="badge badge-secondary">Model: {car.model}</span></h5>
                    
                   
                </div>
            </div>
            </div>))}
            


            </div>
        
        
        
        
        

        )}
}

export default Car

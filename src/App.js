import React from 'react';
import FormFields from './FormFields';


class App extends React.Component{
    
    state = {formData:{
        name:{
            element:"input",
            value:'',
            label:true,
            labelText:"Enter Your Name",
            config:{
                type:"text",
                text:"",
                placeholder:"Name Please..."
            },
            validation:{
                required:true,
                minLength:5
            },
            valid:false,
            touched:false,
            errorMessage:''
        },

        lastname:{
            element:"input",
            value:'',
            label:true,
            labelText:"Enter Your Lastname",
            validation:{
                required:true
            },
            valid:false,
            errorMessage:"",
            touched:false,
            config:{
                type:"text",
                text:"",
                placeholder:"Last Name Please..."
            }
        },

        message:{
            element:"textarea",
            label:true,
            labelText:"Message",
            value:'',
            valid:false,
            errorMessage:"",
            touched:false,
            validation: {
                required:true
            },
            config:{
                rows:5,
                cols:5,
                placeholder:"Message..."
            }
        },

        age:{
            element:"select",
            label:true,
            labelText:"Age",
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false,
            errorMessage:"",
            config:{
               options:[{id:1, value:"18-30"},
                {id:2, value:"30-50"}, {id:3, value:"above 50"}]
            }
        }
    }}

    //Making the component controlled.

    updateState=(newState)=>{
        this.setState({formData: {...this.state.formData, ...newState}});
    }

    handleFormSubmit(e){

        let dataToSubmit = {};
        let isValid = true;

        for(let item in this.state.formData){
            if(this.state.formData.hasOwnProperty(item)){
                isValid = this.state.formData[item].valid && isValid;
            }
        }

        if(isValid){
            for(let item in this.state.formData){
                if(this.state.formData.hasOwnProperty(item)){
                    dataToSubmit = {...dataToSubmit, [item]: this.state.formData[item].value}
                 }
            }
            console.log(dataToSubmit)
        }

        e.preventDefault();
    }

    render(){
        console.log(this.state.formData);
        return(
            <div className="container">
                <h4 className="text-center my-3">React Js Form Templating</h4>
                <form>
                <FormFields formData={this.state.formData} updateState={this.updateState}/>
                <button type="submit" className="btn btn-primary" onClick={(e)=> this.handleFormSubmit(e)}> Submit </button>
                </form>
            </div>

        )
    }
}


export default App;
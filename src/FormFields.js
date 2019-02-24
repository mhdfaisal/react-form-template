import React from 'react';

class FormFields extends React.Component{
    
    state = {formData:[]}

    componentDidMount(){
        let formData = [];
        for(let x in this.props.formData){
            if(this.props.formData.hasOwnProperty(x)){
                formData= [...formData, {id:x, settings: this.props.formData[x]}]
            }
        }
        this.setState({formData:[...formData]});
    }

    renderFields(){
        return this.state.formData.map((item, index)=> {
            return (<div key={index}>
                        {this.renderTemplates(item)}
                    </div>
            )
        });
    }

    showLabel(item){
        let label = item.settings.label ? item.settings.labelText:null;
        return label;
    }

    validate({value, validation}, id){
        let valid = true;
       for(let validationOption in validation){
            if(validation.hasOwnProperty(validationOption)){
                
                switch(validationOption){
                    case "required" : valid = value!=="" && valid? [true, '']:[false, `${id.charAt(0).toUpperCase() + id.slice(1)}   is required`]
                        break;
                    
                    case "minLength": valid = value.length < 5? [false, 'At least 5 characters'] : [true, '']
                        break;
                    default: console.log("Some other error")
                }
            }
       }
       return valid;
    }

    onChangeHandler(e, item, touched){

        const newState = {};
        newState[item.id] = item.settings;
        newState[item.id].value = e.target.value; 
        let validationResult  = this.validate(newState[item.id], item.id);
        newState[item.id].valid = validationResult[0];
        newState[item.id].errorMessage= validationResult[1];
        newState[item.id].touched=touched;
        this.props.updateState(newState);
    }

    showErrorMessage({valid, errorMessage, touched}){

        if(!valid && touched){
            return(
                <div className="text-danger">{errorMessage}</div>
            )
        }

        else return null;
    }

    generateOptions({options}){
       const result = options.map((item, index)=>{
            return(
                <option value={item.value} key={item.id}>{item.value}</option>
            )
       });
       return result;
    }
    
    renderTemplates(item){
        switch(item.settings.element){
            case 'input': return (
                                    <div className="form-group">
                                        {this.showLabel(item)}
                                        <input {...item.config} className="form-control" onChange={(e)=> this.onChangeHandler(e, item, false)}
                                        onBlur = {(e)=> this.onChangeHandler(e, item, true)}
                                         />
                                        {this.showErrorMessage(item.settings)}
                                    </div>
                                )

            case 'textarea': return(
                            <div className="form-group">
                                {this.showLabel(item)}
                                <textarea {...item.config} className="form-control" 
                                    onChange={(e)=> this.onChangeHandler(e, item, false)}
                                    onBlur={e => this.onChangeHandler(e, item, true)}
                                />
                                {this.showErrorMessage(item.settings)}
                            </div>
            )

            case 'select' : return(
                            <div className="form-group">
                            <select className="form-control"  onChange={(e)=> this.onChangeHandler(e, item, false)} 
                            onBlur={e => this.onChangeHandler(e, item, true)}>
                                <option value="">--Please choose an option--</option>
                                {this.generateOptions(item.settings.config)}
                            </select>
                            {this.showErrorMessage(item.settings)}
                            </div>
                            )

            default: return null;
        }
    }

    render(){
        return(
            <div>{this.renderFields()}</div>
        );
    }
}

export default FormFields;
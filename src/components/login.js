import React,{Component} from 'react'
import InputMask from 'react-input-mask';
import classNames from 'classnames'
import _ from 'lodash'
import {isEmail} from "../helpers/email";

export default class LoginForm extends Component{

   constructor(props){
       super(props);

       this.state={
           isLogin:true,
           user:{
               name:"",
               lastName:"",
               email:"",
               tel:"",
               password:"",
               confirmPassword:"",
           },

           error: {
               name: null,
               lastName:null,
               email: null,
               tel:null,
               password: null,
               confirmPassword: null,
           }

       }

       this._onSubmit=this._onSubmit.bind(this);
       this._onTextFieldChange = this._onTextFieldChange.bind(this);
       this._formValidation = this._formValidation.bind(this)
   }

    _formValidation(fieldsToValidate = [],callback = () => {}){
        const {isLogin,user} = this.state;

        const allFields ={
            name:{
                message: "Поле имя должно быть не пустым",
                doValidate: () => {
                    const value = _.trim(_.get(user, 'name', ""));


                    if(value.length > 0){
                        return true;
                    }

                    return false;
                }
            },
            lastName:{
                message: "Поле фамилия должно быть не пустым",
                doValidate: () => {
                    const value = _.trim(_.get(user, 'lastName', ""));


                    if(value.length > 0){
                        return true;
                    }

                    return false;
                }
            },
            email: {
                message: "Неверный формат email",
                doValidate: () => {

                    const value = _.get(user, 'email', '');

                    if(value.length >0 && isEmail(value)){

                        return true;
                    }
                    return false;
                }
            },
            tel: {
                message: "Поле не должно быть пустым",
                doValidate: () => {

                    const value = _.get(user, 'tel', '');

                    if(value && value.length <20){
                        return true;
                    }
                    return false;
                }
            },
            password: {
                message: "Пароль не может быть меньше 6 символов",
                doValidate: () => {


                    const value = _.get(user, 'password', '');


                    if(value && value.length > 6){

                        return true;
                    }

                    return false;

                }
            },
            confirmPassword: {
                message: "Пароли не совпадают!",
                doValidate: () => {


                    const passwordValue = _.get(user, 'password');
                    const value = _.get(user, 'confirmPassword', '');


                    if(passwordValue === value){
                        return true;
                    }

                    return false;

                }
            }
        }

        let errors = this.state.error;

        _.each(fieldsToValidate, (field) => {

            const fieldValidate = _.get(allFields, field);
            if(fieldValidate){

                errors[field] = null;

                const isFieldValid = fieldValidate.doValidate();

                if(isFieldValid === false){
                    errors[field] = _.get(fieldValidate, 'message');
                }
            }

        });

        this.setState({
            error: errors,
        }, () => {

            console.log("ошибки формы", errors);

            let isValid = true;

            _.each(errors, (err) => {

                if(err){
                    isValid = false;

                }
            });

            callback(isValid);

        })
    }

   _onSubmit(event){
       const {isLogin,user} = this.state;
       event.preventDefault();

       let fieldNeedToValidate = ['email', 'password'];

       if(!isLogin){

           fieldNeedToValidate = ['name','lastName', 'email','tel', 'password', 'confirmPassword'];
       }

       this._formValidation(fieldNeedToValidate,(isValid) =>{

           console.log("valid?",isValid);
           //console.log("Form: ",isLogin ?"login":"register", 'data:' ,user)
       });
   }

    _onTextFieldChange(e){
       let {user} = this.state;

       const fieldName = e.target.name;
       const fieldValue = e.target.value;

        user[fieldName] = fieldValue;
        this.setState({user: user});
    }

    render(){
       const {isLogin,user,error} = this.state;
       const title =  isLogin ? 'Вход' : 'Регистрация';
        return(
            <div className={"app-login-form"}>
                <div className={"app-login-form-inner"}>
                    <button onClick={()=>{
                        if(this.props.onClose){
                            this.props.onClose(true);
                        }
                    }} className={"app-dismiss-button"}>Закрыть</button>
                    <h2 className={"form-title"}>{title}</h2>
                    <form onSubmit={this._onSubmit}>

                        {
                            !isLogin ?
                                <div>
                                    <div className={classNames('app-form-item', {'error': _.get(error, 'name')})}>
                                        <label htmlFor="name-id">Имя</label>
                                        <input value={user.name} onChange={this._onTextFieldChange} placeholder="Введите имя" id="name-id" type="text" name="name"/>
                                    </div>
                                    <div className={classNames('app-form-item', {'error': _.get(error, 'lastName')})}>
                                        <label htmlFor="lastName-id">Фамилия</label>
                                        <input value={user.lastName} onChange={this._onTextFieldChange} placeholder="Введите фамилию" id="lastName-id" type="text" name="lastName"/>
                                    </div>
                                    <div className={classNames('app-form-item', {'error': _.get(error, 'tel')})}>
                                        <label htmlFor="tel-id">Телефон</label>
                                        <InputMask value={user.tel} onChange={this._onTextFieldChange} mask="+375 (99) 999 99 99"  placeholder="Введите телефон" id="tel-id" type="text" name="tel"/>
                                    </div>
                                </div> : null
                        }

                        <div className={classNames('app-form-item', {'error': _.get(error, 'email')})}>
                            <label htmlFor="email-id">Почта</label>
                            <input value={user.email} onChange={this._onTextFieldChange} placeholder="Введите почту" id="email-id" type="email" name="email"/>
                        </div>
                        <div className={classNames('app-form-item', {'error': _.get(error, 'password')})}>
                            <label htmlFor="password-id">Пароль</label>
                            <input value={user.password} onChange={this._onTextFieldChange} placeholder="Введите пароль" id="password-id" type="password" name="password"/>
                        </div>

                        {
                            !isLogin ?
                                <div>
                                    <div className={classNames('app-form-item', {'error': _.get(error, 'confirmPassword')})}>
                                        <label htmlFor="confirm-password-id">Повторите пароль</label>
                                        <input value={user.confirmPassword} onChange={this._onTextFieldChange} placeholder="Повторите пароль" id="confirm-password-id" type="password" name="confirmPassword"/>
                                    </div>
                                </div> : null
                        }

                        {
                            isLogin ? <div className={"app-form-actions"}>
                            <button className={"app-button primary"}>Войти</button>
                            <div className={"app-form-description"}>
                            <div>Нет аккаунта?
                            <button type="button" onClick={()=> {

                            this.setState({isLogin:false});

                        }} className={"app-button app-button-link"}>Зарегистрироваться</button>
                            </div>
                            </div>
                            </div>
                            :
                            <div className={"app-form-actions"}>
                            <button className={"app-button primary"}>Зарегистрироваться</button>
                            <div className={"app-form-description"}>
                            <div>Нет аккаунта?
                            <button type="button" onClick={()=> {

                            this.setState({isLogin:true});

                        }} className={"app-button app-button-link"}>Войти</button>
                            </div>
                            </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import CommentsComponent from './comments';

class Board extends Component {
    constructor(props) {
        super(props)
    
       this.input=React.createRef();
       this.state={
        comments:[]
          }
    }

    componentDidMount() {
        const list = window.localStorage.getItem('comments');
        const parsedList = JSON.parse(list);
        if(list == null){
            return false
        }
        else{
            this.setState({
                comments: parsedList,
            })
        }
    }

    removeComment(i){
        //var arr = this.state.comments;
        //arr.splice(i,1);
        //this.setState({comments: arr});

        let list=JSON.parse(localStorage.getItem('comments'));
        list.splice(i,1);
        this.setState({comments: list});
        localStorage.setItem("comments",JSON.stringify(list));


    }
    updateComment(newText, i){
        //var arr = this.state.comments;
        //arr[i] = newText;
        //this.setState({comments: arr});

        let list=JSON.parse(localStorage.getItem('comments'));
        list[i] = newText;
        this.setState({comments:list});
        localStorage.setItem("comments",JSON.stringify(list));
    }
    eachComment(text, i){
        return (
                <CommentsComponent key={i} index={i} updateCommentText = {this.updateComment.bind(this)} deleteFromBoard = {this.removeComment.bind(this)}>
                   {text}  
                </CommentsComponent>
            );
    }
    addNewComment(text){
        //var arr = this.state.comments;
        //arr.push(text);
        //this.setState({comments:arr});

        //console.log("Allow Duplicates in Board compolnent _ AddNewComment: "+localStorage.getItem('allowDuplicates')) ;
        if(localStorage.getItem('comments')==null){
            const list=[];
            list.push(text);
            localStorage.setItem("comments",JSON.stringify(list))
        }
        else{
            const list=JSON.parse(localStorage.getItem('comments'));
            const allowDup = localStorage.getItem('allowDuplicates');
            var found=false;
            if(allowDup === "false" || allowDup == "false" || allowDup == false){
                found = list.some(e1 => e1 === text);
                console.log("Inside allowDup");
            } else{ found = false}
            //console.log("In add new:"+allowDup + "found =" +found)
            if (!found) {
                list.push(text);
                this.setState({comments:list});
                localStorage.setItem("comments",JSON.stringify(list));
            }
        }
        this.setState({
            comments:JSON.parse(localStorage.getItem('comments'))
        });
    }
    render(){
        return(
            <div>
                <button onClick= {this.addNewComment.bind(this,'Default Text')}className= "button-info create">Add New</button>
                <div  className= "board">
                {
                    this.state.comments.map(this.eachComment.bind(this))
                }
                </div> 
            </div>
        );
    }

}

export default Board;
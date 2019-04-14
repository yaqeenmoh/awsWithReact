import React from 'react';
import {  Text, View , Button , TouchableOpacity , Animated , TextInput } from 'react-native';

import Styles from './styles';



export default class Main extends React.Component{
    state = {
        Anim: new Animated.Value(0), 
        moveAnimation : new Animated.ValueXY({ x: 10, y: 0 }),
        fadeAnim: new Animated.Value(0), 
        post_value :null
        // Initial value for opacity: 0
      }
    constructor(props)
    {
        super(props);
       

    }

    addPost = ()=>{

      const action = "add";
      
      if(this.state.post_value==null)
      {
        alert("Please enter post body");
       
      }else{
      let post = this.state.post_value;
    
    

     
      fetch('https://fezrx27gxb.execute-api.us-east-2.amazonaws.com/dev_stage?action='+action+'&post='+post,
       {
        method:"get",
        headers: {
          'Content-Type': 'application/json',
        },
     


    }
    ).then((response) => response.json())
    .then((responseJson) => {
alert("saving success");

    }).catch(err=>{
      alert(err);
    })
  }
  }

    componentDidMount() {
        Animated.spring(this.state.moveAnimation, {
            toValue: {x: 10, y: 200},
          }).start()
          this.fadeButton();  
                             // Starts the animation
      }
      setPost (e){
        this.setState({post_value:e.target.value});
      }

      fadeButton = ()=>{
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 10000,              // Make it take a while
            }
          ).start();  
      }
    render(){
        let { fadeAnim } = this.state;

        return (
            

    <View style={Styles.container}>
    <Animated.View           // Special animatable View
    style={this.state.moveAnimation.getLayout()}
    
      >
 
    
<TextInput style={[{ borderColor: '#fff', borderBottomWidth: 1, padding: 5, width:300 }]}
placeholderTextColor="#fff"
 placeholder="Enter post"
 onChangeText={(e) =>{ this.setState({post_value:e})}}
 selectionColor="#fff">
 </TextInput>

   



</Animated.View>
<Animated.View           // Special animatable View
  style={{opacity:fadeAnim}}
      >
 
    
<TouchableOpacity style={Styles.buttonStyle} onPress={this.addPost} >

<Text style={{color:"white"}}>
    Enter post
</Text>

   

</TouchableOpacity>

</Animated.View>
    </View>
        )
    }

}


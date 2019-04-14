import React from 'react';

import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import Styles from './styles';


export default  class PostItem extends React.Component{

    constructor(props)
    {
        super(props);
    }

    render(){
        return (
          
           
            
              <Card style={{width:"100%"}}>
              
                <CardItem>
                  <Body>
                      <Text>
                          {this.props.data.date}
                      </Text>
                    <Text>

                    {this.props.data.body}
                    </Text>
                  </Body>
                </CardItem>
              
             </Card>
          
        )
    }

}
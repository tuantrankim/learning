import React from 'react'

class App extends React.Component{
    render(){
        return(
            <div>
            Hello
            <Parent>
                <div className="childA">Steven here</div>
                
            </Parent>
            </div>
        )
    }
}

class Parent extends React.Component{
    render(){
        //get props children
        let children = this.props.children;
        console.log(children)
        //get props children by using map
        //In case Parent has only 1 children. props.children is not an array so you cannot use map instead you can use React.Children
        //let items1 = this.props.children.map(child => child)
        //console.log(items1)
        let reactChildren = React.Children
        let items2 = reactChildren.map(child=>child)
        console.log(items2)
            
        let items3 = React.Children.toArray(this.props.children)
        console.log(items3)

        //loop through the items
        React.Children
            .forEach(this.props.children, child => console.log(child.props.className))
        //it will throw error if there are more than 1 child
       let items4 = React.Children.only(this.props.children)

       console.log(items4)

        return null;
    }
}

export default App
### Source code from this lesson
https://egghead.io/lessons/react-use-react-cloneelement-to-extend-functionality-of-children-components

    //Clone an element using 
    React.cloneElement(<sourceObj>,{<extend props>})
    //e.g.
    React.cloneElement(child,{
        onClick: this.selectItem.bind(this, child.props.value)
    })

    //becareful cloning an object is diffrent to cloning an element
    Object.assign(target, ...sources)
    var obj = { a: 1 };
    var copy = Object.assign({}, obj); //clone obj to an empty object
    console.log(copy); // { a: 1 }



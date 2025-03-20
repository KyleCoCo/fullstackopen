const Notification = ({ notification }) => {
    if (notification === null || notification.message === null) {
        return null
    }
    const show_style = {
        color: 'green',
        backGround: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if(notification.type != null && notification.type === 'Error') {
        show_style.color = 'red'
    }
    return (
        <div className='notification' style={show_style}>
            {notification.message}
        </div>
    )
}


  export default Notification
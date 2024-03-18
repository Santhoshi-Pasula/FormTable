function setTimer(){
    const x=`
    <div>
        <h1>javascript</h1>
        <input type="text" />
        <p>${new Date().toLocaleTimeString()}</p>
    </div>
    `;
    document.getElementById('obj1').innerHTML=x;
    const y=React.createElement(
        'div',
        null,
        React.createElement('h1',null, 'React'),
        React.createElement('div',null,
        React.createElement('input', {type:'text'})
        ),
        React.createElement('p', null, new Date().toLocaleTimeString())
    );
    ReactDOM.render(y, document.getElementById('obj2'));
}
setInterval(setTimer,1000);
console.log('test')
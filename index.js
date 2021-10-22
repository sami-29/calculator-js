$('#numbers,#operations').children().on('click',
    (e) => {
        if (e.target.innerHTML === '=') { $('#input').html('Result') }
        else { $('#input').append(e.target.innerHTML) }
    })

$('#ac-clear').on('click',
    (e) => {
        if (e.target.innerHTML === 'AC') { $('#input').html('') }
        if (e.target.innerHTML === 'DEL') {
            var temp = $('#input').html()
            $('#input').html(`${temp.substring(0, temp.length - 1)}`)
        }
    })


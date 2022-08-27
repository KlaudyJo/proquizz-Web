const getResponse = function(url='', errorMsg= 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    
        return response.json();
      });
    };




const getData = async function() {
    const [categoryId, subcategoryId] = ['#category_select', '#subcategory_select']
    const [urlUniq, urlMeta] = ['https://proquizz-api.herokuapp.com/questions/uniques', 'https://proquizz-api.herokuapp.com/questions/metadata']
    const category_select = $(categoryId);
    const subcategorySelect = $(subcategoryId);
    const appendCat =  function(arr) {
        for (const val of arr) {
            subcategorySelect
                .append($('<option>').val(val).text(val))
            }
    
    
    }
    try {
        const [uniques, metaData] = await Promise.all([
            getResponse(urlUniq), 
            getResponse(urlMeta)
        ])


        if (categoryId  === '#category_select'){
        var $edit = $('#apiKeyCat');
        var  curValue = $edit.val();
        $edit.val(curValue + '\n' + urlUniq);

        var $apiMeta = $('#apiKeyMet');
        var  curValue = $apiMeta.val();
        $apiMeta.val(curValue + '\n' + urlMeta);

        $('#uniqueCat').text(JSON.stringify(uniques, undefined,4))

        $('#uniqueMet').text(JSON.stringify(metaData, undefined,4))
        };


        $.each(uniques, function(key, value) {
            category_select.append($('<option>').val(key).text(key))})
            appendCat(uniques[category_select.find(':selected').text()])
            

        category_select.change(function(){{
            const selectedCategory = category_select.find(':selected').text();
                 $.each(uniques, function(key, value) {
                 if (selectedCategory === key)  {
                    subcategorySelect.empty()
                    appendCat(value);
                       }
                    });
                    }
    })
    
    } catch (err) {
        console.log(err)
    }
 };


 getData()



$('#numQuestRange').change(function() {
    var $numberofQuestion = $('#numQuestRange').val()
    
    var $numQuestion = $('#numQuestion');
    $numQuestion.text($numberofQuestion);
    })
  
  var apiKeyLink = $('#apiKey');
  $('#form_question').submit(function(event){
    
    var category = $('#category_select option:selected').text();
    var subcategory =$('#subcategory_select option:selected').text();
    var difficulty = $('#difficulty_select option:selected').val();
    var limit = $('#numQuestRange').val()
    var apiLink = `https://proquizz-api.herokuapp.com/questions?category=${category}&subcategory=${subcategory}&limit=${limit}&difficulty=${difficulty}` 
    apiKeyLink.text(apiLink)
    event.preventDefault();
    getResponse(apiLink).then((data) => {
        console.log(data)
        var textedJSON = JSON.stringify(data, undefined,4)
        $('#myTextarea').text(textedJSON)
    }  )
   
  });





// recieve data from forms POST 
var $code_block = $('#code_block')
const postForm = $('#form_post');

function sendData() {
    var question = $('#question').val()
    //var category = $('#cat_select option:selected').text();
    //var subcategory =$('#subcat_select option:selected').text();
    var category = $('#cat_input').val();
    var subcategory =$('#subcat_input').val();
    var difficulty = $('#diff_select option:selected').val();
    var code_block = $code_block.val();
    var correct_ans = $('#cor_answ').val();
    var incorr_ans = new Array($('#incor_answ_1').val(),$('#incor_answ_2').val(), $('#incor_answ_3').val())


    var token = $('input[name="csrfToken"]').attr('value');

    const server_data = [
        {
            'category': category,
            'subcategory' : subcategory,
            'difficulty' : difficulty,
            'block_code': code_block, 
            'question': question,
            'correct_answer': correct_ans,
            'wrong_answers': incorr_ans,
        }
    ]
    $.ajax({
        type: 'POST',
        url: '/form/data',
        data: JSON.stringify(server_data),
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'X-CSRFToken': token 
        }, 
        success: function(result) {
            console.log(result)
            alert('Data saved')

        }

    })
}

postForm.submit(function(event){
    event.preventDefault();
    sendData();
   postForm.get(0).reset()



});

$('#checkCode').click(function(){
    if ($(this).is(":checked")) {
        $code_block.removeClass('hidden')
    }
    else {
        $code_block.addClass('hidden')
    }
})

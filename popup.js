    $(document).ready(function() {
          //fetch_feed();
    });
    function fetch_feed() {
            chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://localhost:8080/continuousreading/login.jsp'},
                    function(response) {
                            display_stories(response);
                    }
            );
    }
    
    function display_stories(response)
    {
      $("#rss").html(response);
      console.log(response);
    }
    

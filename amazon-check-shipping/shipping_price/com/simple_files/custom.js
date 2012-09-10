QUORUS.use(function(Q) {
  var BACON = QUORUS.BACON,
          Y = QUORUS.Y;

  //A/B test different strings on the authoring button callout
  Y.use('bacon-ab', function(Y) {
    BACON.once('mobileShareButtonReady', function(btn) {
      BACON.AB.on('trial:authoring_cta', function(treatment) {
        var cta_str;
        switch(treatment) {
          case 'sms_text1': cta_str = "Want quick feedback? Text this product to a friend."; break;
          case 'sms_text2': cta_str = "Want quick feedback? Text your friend a question, get an answer."; break;
          case 'discuss1':  cta_str = "Discuss with a friend."; break;
          case 'discuss2':  cta_str = "Want an opinion? Discuss this with a friend now."; break;
          case 'tell1':     cta_str = "Tell a friend about this."; break;
          default:          cta_str = "Need help deciding? Ask a friend now."; break;
        }
        if(cta_str) {
          btn.set('cta', cta_str);
        }
      });
    });

    BACON.AB.on('trial:inpage_cta', function(treatment) {
      var cta_node;
      var new_node;
      switch(treatment) {
        case 'buy_box':
          cta_node = Y.one('.GFTButtonCondo');
          // Need to manually adjust 'background-position-y' to accomodate the buy_box button for kindle ebook detail pages
          Y.all('form[name=addToWishlist] td.bottomLeft, [name=addToWishlist] td.bottomRight').setStyle('background-position-y', '-32px');
          break;
        case 'share_box':
          cta_node = Y.one('#tafContainerDiv');
          new_node = Y.Node.create("<div class=\"quorus-spacer\"></div>\n<span class=\"tiny\"><a href=\"\" class=\"quorus-discuss\" onclick=\"return false;\">Ask a Friend</a></span>");
          break;
        case 'jump_box':
          cta_node = Y.one('#handleBuy');
          new_node = Y.Node.create("<span class=\"tiny\"><a href=\"\" class=\"quorus-discuss\" onclick=\"return false;\">Ask a Friend</a></span>");
          break;
        case 'review_box':
          cta_node = Y.one('#writeReviewButton');
          if (!cta_node) {
            if (Y.one('#noReviews')) {
              cta_node = Y.one('#noReviews').one('#revWR');
            } else if (Y.one('.reviews')) {
              var rev_node = Y.one('.reviews');
              if (rev_node.one('.mb20')) {
                cta_node = rev_node.one('.mb20');
              } else if (rev_node.one('#ftWR')) {
                cta_node = rev_node.one('#ftWR');
              }
            }
          }
          new_node = Y.Node.create("<div class=\"quorus-spacer\"></div>\n<span class=\"tiny\"><a href=\"\" class=\"quorus-discuss\" onclick=\"return false;\">Ask a Friend</a></span>");
          break;
        default:
          break;
      }
      if (cta_node) {
        if (!new_node) {
          new_node = Y.Node.create("<div class=\"quorus-discuss quorusInPage\">\n  <span class=\"quorusInPage\">Ask a Friend</span>\n</div>");
        }
        cta_node.append(new_node);
      }
    });
  });

  //AB test of the google import teaset logo
  Y.use('bacon-ab', function(Y) {
    BACON.after('rootNodeReady', function(rootNode) {
      BACON.AB.on('trial:google_import_teaser', function(treatment) {
        switch(treatment) {
          case 'without_teaser':
              rootNode.addClass('q_treatment_no_google_teaser');
            break;
        }
      });
    });
    
    //A/B test for 0-step authoring
    BACON.AB.on('trial:zero_step_authoring', function(treatment) {
      BACON.once('mobileShareButtonReady', function(btn) {
        //Trigger the zero-step styles, but not if you have 
        if(treatment == "yes") {
          //For any given detailPane attached to the share button, 
          btn.withValue('detailPane', function(ev) {
            var pane = ev.newVal,
                bb   = pane && pane.get('boundingBox');

            //Zero step hides recent flows, so we only apply it if you don't have any
            if(bb && !bb.one('.q_recent_flows') && !bb.one('.q_signin_area')) {
              bb.addClass('q_as_a_flow');
              //Fixup the Selector widget which bases its width off of the input field
              var formNode = bb.one("form[q_component='AuthoringForm']"),
                  inputWidget;
                  
              if(!formNode)
                return;
              
              formNode.authoringForm._selector.set('width', formNode.one('input.q_name').get('region').width);
            }
          });
        }
      });
    });
  });
});

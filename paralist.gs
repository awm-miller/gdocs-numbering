function onOpen() {
    DocumentApp.getUi().createMenu('Paragraph Tools')
    .addItem('Auto Number Paragraphs', 'numberParaAdd')
    .addItem('Clear Paragraph Numbers', 'numberParaClear')
    .addToUi();
  }
  
  function numberParaAdd(){
    numberPara(true);
  }
  
  function numberParaClear(){
    numberPara(false);
  }
  
  function numberPara(add) {
    var document = DocumentApp.getActiveDocument();
    var selection = document.getSelection();
    
    // Check if there is a selection
    if (!selection) {
      DocumentApp.getUi().alert('Please select some text first.');
      return;
    }

    var elements = selection.getSelectedElements();
    var numbers = 0;

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i].getElement();
      
      // Skip if not a paragraph or if it's a list item
      if (element.getType() !== DocumentApp.ElementType.PARAGRAPH || 
          element.getType() === DocumentApp.ElementType.LIST_ITEM) {
        continue;
      }
      
      var paragraph = element.asParagraph();
      var text = paragraph.getText() + '';
      var type = paragraph.getHeading();
      
      // Skip if element is a heading or subheading
      if (type === DocumentApp.ParagraphHeading.HEADING1 ||
          type === DocumentApp.ParagraphHeading.HEADING2 ||
          type === DocumentApp.ParagraphHeading.HEADING3 ||
          type === DocumentApp.ParagraphHeading.HEADING4 ||
          type === DocumentApp.ParagraphHeading.HEADING5 ||
          type === DocumentApp.ParagraphHeading.HEADING6 ||
          type === DocumentApp.ParagraphHeading.SUBTITLE ||
          type === DocumentApp.ParagraphHeading.TITLE) {
        continue;
      }
      
      // exclude empty paragraphs
      if (text.match(/^\s*$/)) {
        continue;
      }

      var textElement = paragraph.editAsText();
      
      if (add == true) {
        numbers++;
        // Remove existing numbering if present
        if (text.match(/^\d+\.\s*/)) {
          var match = text.match(/^\d+\.\s*/)[0];
          textElement.deleteText(0, match.length - 1);
        }
        // Insert new numbering at start
        textElement.insertText(0, numbers + '. ');
      } else {
        // Remove numbering if present
        if (text.match(/^\d+\.\s*/)) {
          var match = text.match(/^\d+\.\s*/)[0];
          textElement.deleteText(0, match.length - 1);
        }
      }
    }
  }
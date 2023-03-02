import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon, QLineEdit } from '@nodegui/nodegui';
import logo from '../assets/logox200.png';
import mickey from '../assets/mickey.png';
import Main_Execute from './ApigeeTool';


// Main_Execute();
const win = new QMainWindow();
win.setWindowTitle("Hello World");
win.resize(700, 400);

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);
centralWidget.resize(200,299);

const label = new QLabel();
label.setObjectName("mylabel");
label.setText("Hello");

const button = new QPushButton();
button.setIcon(new QIcon(logo));
button.setObjectName("button");
button.addEventListener('clicked', Main_Execute )


const button1 = new QPushButton();
button1.setIcon(new QIcon(mickey));


const label2 = new QLabel();
label2.setText("World");
label2.setInlineStyle(`
  color: red;
`);


const myLineEdit = new QLineEdit();
const { QListView } = require("@nodegui/nodegui");

const listview = new QListView();


// myLineEdit.addEventListener('KeyPress', (nativeEvent) => {
//   const event = new QKeyEvent(nativeEvent);

//   const key = event.key();
//   if ([Key.Key_Escape, Key.Key_Enter, Key.Key_Return].includes(key)) {
//     event.accept();
//     myLineEdit.setEventProcessed(true);
//   }
// });

rootLayout.addWidget(label);
rootLayout.addWidget(button);
rootLayout.addWidget(button1);
rootLayout.addWidget(label2);

rootLayout.addWidget(myLineEdit);
rootLayout.addWidget(listview);


win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #009688;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #mylabel {
      font-size: 24px;
      font-weight: bold;
      padding: 10;
    }
    #button {
      width: 170px;
      height : 170px;
      margin-bottom: 10px;

    }
  `
);
win.show();

(global as any).win = win;

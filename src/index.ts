import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon, QLineEdit, QListView, QKeyEvent, Key } from '@nodegui/nodegui';
import logo from '../assets/logox200.png';
import mickey from '../assets/mickey.png';
import {Main_Execute ,clear_files, Field_Extract} from './ApigeeTool';

let fields:string = '';
 

clear_files();

const exec_process = () => { Field_Extract(fields)};

const win = new QMainWindow();
win.setWindowTitle("Apigee Trace Analysis Tool");
win.resize(800, 800);

const centralWidget = new QWidget();

// const viewWidget1 = new QWidget();
// const qboxLayout = new QBoxLayout(2);
// viewWidget1.setLayout(qboxLayout);

centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);
centralWidget.resize(400,299);

const label = new QLabel();
label.setText('Pls press "Extract Request/Response" to aggregate Request/Response');

const button = new QPushButton();
button.setIcon(new QIcon(mickey));
button.setText('Extract Request/Response')
button.addEventListener('clicked', Main_Execute )


const button1 = new QPushButton();
button1.setIcon(new QIcon(logo));
button1.setText('Extract Fields')
button1.addEventListener('clicked', exec_process )


const label2 = new QLabel();
label2.setText('Pls press "Extract Fields"  to parse fields after inputting in  below textfield to create excel else let it remain blank');
label2.setInlineStyle(`
  color: yellow;
`);


const myLineEdit = new QLineEdit();
myLineEdit.setFixedWidth(200);
myLineEdit.addEventListener('textChanged', e => fields = e );


const listview = new QLabel();
const listview1 = new QLabel();
const listview2 = new QLabel();



rootLayout.addWidget(label);
rootLayout.addWidget(button);
rootLayout.addWidget(listview);
rootLayout.addWidget(label2);
rootLayout.addWidget(myLineEdit);
rootLayout.addWidget(listview1);
rootLayout.addWidget(button1);

rootLayout.addWidget(listview2);
// rootLayout.addWidget(viewWidget1);
// qboxLayout.addWidget(myLineEdit);
// qboxLayout.addWidget(listview);

win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #009688;
      height: '100%';
      align-items: 'center';
      justify-content: 'start';
    }
    #mylabel {
      font-size: 20px;
      font-weight: lighter;
      padding: 40;
    }
    #button {
      width: 90px;
      height : 50px;
      margin-bottom: 65px;

    }
  `
);
win.show();

(global as any).win = win;

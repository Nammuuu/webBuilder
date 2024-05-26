
// folder app/Components/ThemeEditor.js 

// import { useEffect, useRef } from 'react';
// import grapesjs from 'grapesjs';
// import 'grapesjs/dist/css/grapes.min.css';
// import 'grapesjs-preset-webpage';
// import 'grapesjs-plugin-export';
// import 'grapesjs-blocks-basic';
// import axios from 'axios';

// const ThemeEditor = ({ userId }) => {
//   const editorRef = useRef(null);

//   const handleSave = async ({ html, css }) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No token found');
//       return;
//     }
//     try {
//       const name = prompt('Enter theme name');
//       const description = prompt('Enter theme description');
//       const response = await axios.post('/api/themes', { userId, content: { html, css }, name, description }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       // console.log("response data", response.data);
//       console.log('Theme saved successfully');
//     } catch (error) {
//       console.error('Error saving theme:', error.message);
//     }
//   };

//   useEffect(() => {
//     const editor = grapesjs.init({
//       container: editorRef.current,
//       fromElement: true,
//       plugins: [
//         'grapesjs-preset-webpage',
//         'grapesjs-plugin-export',
//         'grapesjs-blocks-basic'
//       ],
//       pluginsOpts: {
//         'grapesjs-preset-webpage': {},
//         'grapesjs-plugin-export': {
//           btnLabel: 'Export',
//           filenamePfx: 'my-theme',
//         },
//         'grapesjs-blocks-basic': {},
//       },
//       storageManager: {
//         type: 'none',
//       },
//       blockManager: {
//         appendTo: '#blocks',
//         blocks: [
//           {
//             id: 'section', 
//             label: '<b>Section</b>',
//             attributes: { class:'gjs-block-section' },
//             content: `<section>
//               <h1>This is a simple title</h1>
//               <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
//             </section>`,
//           },
//           {
//             id: 'text',
//             label: 'Text',
//             content: '<div data-gjs-type="text">Insert your text here</div>',
//           },
//           {
//             id: 'image',
//             label: 'Image',
//             select: true,
//             content: { type: 'image' },
//             activate: true,
//           },
//           {
//             id: 'grid-2',
//             label: '2 Columns',
//             content: `
//               <div class="row">
//                 <div class="cell">Cell 1</div>
//                 <div class="cell">Cell 2</div>
//               </div>`,
//           },
//         ],
//       },
//     });

//     editor.Panels.addButton('options', {
//       id: 'save-button',
//       className: 'fa fa-save',
//       command: 'save-db',
//       attributes: { title: 'Save' },
//     });

//     editor.Commands.add('save-db', {
//       run: async (editor) => {
//         const html = editor.getHtml();
//         const css = editor.getCss();
//         await handleSave({ html, css });
//       },
//     });

//     return () => {
//       editor.destroy();
//     };
//   }, []);

//   return (
//     <>
//       <div id="blocks"></div>
//       <div ref={editorRef} style={{ height: '500px', width: '100%' }} />
//     </>
//   );
// };

// export default ThemeEditor;


// import { useEffect, useRef } from 'react';
// import grapesjs from 'grapesjs';
// import 'grapesjs/dist/css/grapes.min.css';
// import 'grapesjs-preset-webpage';
// import 'grapesjs-plugin-export';
// import 'grapesjs-blocks-basic';
// import axios from 'axios';

import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage';
import 'grapesjs-plugin-export';
import 'grapesjs-blocks-basic';
import 'grapesjs-blocks-flexbox';
import 'grapesjs-plugin-forms';
import 'grapesjs-blocks-bootstrap4';

// import styles '../../styles/EditorPage.module.css';
import  '../../styles/EditorPage.module.css';
import  '../../styles/custom-editor.css';
import axios from 'axios';

import { customBlocks } from './customBlocks';





const ThemeEditor = ({ userId }) => {
  const editorRef = useRef(null);

  const handleSave = async ({ html, css }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const name = prompt('Enter theme name');
      const description = prompt('Enter theme description');
      await axios.post('/api/themes', { userId, content: { html, css }, name, description }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Theme saved successfully');
    } catch (error) {
      console.error('Error saving theme:', error.message);
    }
  };

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      height: '100vh',
      width: 'auto',
      plugins: [
        'grapesjs-preset-webpage',
        'grapesjs-plugin-export',
        'grapesjs-blocks-basic',
        'grapesjs-blocks-flexbox',
        'grapesjs-plugin-forms',
        'grapesjs-blocks-bootstrap4'
      ],
      pluginsOpts: {
        'grapesjs-preset-webpage': {},
        'grapesjs-plugin-export': {
          btnLabel: 'Export',
          filenamePfx: 'my-theme',
        },
        'grapesjs-blocks-basic': {},
        'grapesjs-blocks-flexbox': {},
        'grapesjs-plugin-forms': {},
        'grapesjs-blocks-bootstrap4': {},
      },
      storageManager: {
        type: 'none',
      },
      blockManager: {
        appendTo: '#blocks',
        blocks: customBlocks,
      },
      styleManager: {
        sectors: [{
          name: 'General',
          buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
          properties:[{
            name: 'Alignment',
            property: 'float',
            type: 'radio',
            defaults: 'none',
            list: [
              { value: 'none', className: 'fa fa-times'},
              { value: 'left', className: 'fa fa-align-left'},
              { value: 'right', className: 'fa fa-align-right'}
            ],
          }],
        },{
          name: 'Dimension',
          open: false,
          buildProps: ['width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
          properties: [{
            id: 'flex-width',
            type: 'integer',
            name: 'Width',
            units: ['px', '%'],
            property: 'flex-basis',
            toRequire: 1,
          },{
            property: 'margin',
            properties:[
              { name: 'Top', property: 'margin-top'},
              { name: 'Right', property: 'margin-right'},
              { name: 'Bottom', property: 'margin-bottom'},
              { name: 'Left', property: 'margin-left'}
            ],
          },{
            property: 'padding',
            properties:[
              { name: 'Top', property: 'padding-top'},
              { name: 'Right', property: 'padding-right'},
              { name: 'Bottom', property: 'padding-bottom'},
              { name: 'Left', property: 'padding-left'}
            ],
          }],
        },{
          name: 'Typography',
          open: false,
          buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-shadow'],
          properties: [
            { name: 'Font', property: 'font-family'},
            { name: 'Weight', property: 'font-weight'},
            { name: 'Font color', property: 'color'},
            {
              property: 'text-shadow',
              properties: [
                { name: 'X position', property: 'text-shadow-offset-x'},
                { name: 'Y position', property: 'text-shadow-offset-y'},
                { name: 'Blur', property: 'text-shadow-blur'},
                { name: 'Color', property: 'text-shadow-color'}
              ],
          }],
        },{
          name: 'Decorations',
          open: false,
          buildProps: ['opacity', 'border-radius', 'border', 'box-shadow', 'background'],
          properties: [{
            type: 'slider',
            property: 'opacity',
            defaults: 1,
            step: 0.01,
            max: 1,
            min:0,
          },{
            property: 'border-radius',
            properties  : [
              { name: 'Top', property: 'border-top-left-radius'},
              { name: 'Right', property: 'border-top-right-radius'},
              { name: 'Bottom', property: 'border-bottom-left-radius'},
              { name: 'Left', property: 'border-bottom-right-radius'}
            ],
          },{
            property: 'box-shadow',
            properties: [
              { name: 'X position', property: 'box-shadow-h'},
              { name: 'Y position', property: 'box-shadow-v'},
              { name: 'Blur', property: 'box-shadow-blur'},
              { name: 'Spread', property: 'box-shadow-spread'},
              { name: 'Color', property: 'box-shadow-color'},
              { name: 'Shadow type', property: 'box-shadow-type'}
            ],
          },{
            property: 'background',
            properties: [
              { name: 'Image', property: 'background-image'},
              { name: 'Repeat', property: 'background-repeat'},
              { name: 'Position', property: 'background-position'},
              { name: 'Attachment', property: 'background-attachment'},
              { name: 'Size', property: 'background-size'}
            ],
          }],
        }],
      },
    });

    editor.Panels.addButton('options', {
      id: 'save-button',
      className: 'fa fa-save',
      command: 'save-db',
      attributes: { title: 'Save' },
    });

    editor.Commands.add('save-db', {
      run: async (editor) => {
        const html = editor.getHtml();
        const css = editor.getCss();
        await handleSave({ html, css });
      },
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <>
      <div id="blocks" style={{ marginBottom: '10px' }}></div>
      <div ref={editorRef} style={{ height: '500px', width: '100%' }} />
    </>
  );
};

export default ThemeEditor;

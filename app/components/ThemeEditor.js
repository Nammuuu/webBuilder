

import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage';
import 'grapesjs-plugin-export';
import 'grapesjs-blocks-basic';
import 'grapesjs-blocks-flexbox';
import 'grapesjs-plugin-forms';
import 'grapesjs-blocks-bootstrap4';
import 'grapesjs-lory-slider';
import 'grapesjs-tabs';
import 'grapesjs-custom-code';
import 'grapesjs-component-code-editor';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
      plugins: [
        'grapesjs-preset-webpage',
        'grapesjs-plugin-export',
        'grapesjs-blocks-basic',
        'grapesjs-blocks-flexbox',
        'grapesjs-plugin-forms',
        'grapesjs-blocks-bootstrap4',
        'grapesjs-lory-slider',
        'grapesjs-tabs',
        'grapesjs-custom-code',
        'grapesjs-component-code-editor'
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
        'grapesjs-lory-slider': {},
        'grapesjs-tabs': {},
        'grapesjs-custom-code': {},
        'grapesjs-component-code-editor': {}
      },
      storageManager: {
        type: 'none',
      },
      blockManager: {
        appendTo: '#blocks',
        blocks: customBlocks,
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
      
      <div ref={editorRef} id="gjs" style={{ height: '100vh' }} />
      
    </>
  );
};

export default ThemeEditor;


// import { useEffect, useRef } from 'react';
// import grapesjs from 'grapesjs';
// import 'grapesjs/dist/css/grapes.min.css';

// import 'grapesjs-preset-webpage';
// import 'grapesjs-plugin-export';
// import 'grapesjs-blocks-basic';
// import 'grapesjs-blocks-flexbox';
// import 'grapesjs-plugin-forms';
// import 'grapesjs-blocks-bootstrap4';
// import 'grapesjs-lory-slider';
// import 'grapesjs-tabs';
// import 'grapesjs-custom-code';
// import 'grapesjs-component-code-editor';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import axios from 'axios';
// import { customBlocks } from './customBlocks';

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
//       await axios.post('/api/themes', { userId, content: { html, css }, name, description }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
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
//         'grapesjs-blocks-basic',
//         'grapesjs-blocks-flexbox',
//         'grapesjs-plugin-forms',
//         'grapesjs-blocks-bootstrap4',
//         'grapesjs-lory-slider',
//         'grapesjs-tabs',
//         'grapesjs-custom-code',
//         'grapesjs-component-code-editor'
//       ],
//       pluginsOpts: {
//         'grapesjs-preset-webpage': {},
//         'grapesjs-plugin-export': {
//           btnLabel: 'Export',
//           filenamePfx: 'my-theme',
//         },
//         'grapesjs-blocks-basic': {},
//         'grapesjs-blocks-flexbox': {},
//         'grapesjs-plugin-forms': {},
//         'grapesjs-blocks-bootstrap4': {},
//         'grapesjs-lory-slider': {},
//         'grapesjs-tabs': {},
//         'grapesjs-custom-code': {},
//         'grapesjs-component-code-editor': {}
//       },
//       storageManager: {
//         type: 'none',
//       },
//       blockManager: {
//         appendTo: '#blocks',
//         blocks: customBlocks,
//       },
//       panels: {
//         defaults: [
//           {
//             id: 'panel-top',
//             el: '.panel__top',
//           },
//           {
//             id: 'basic-actions',
//             el: '.panel__basic-actions',
//             buttons: [
//               {
//                 id: 'save',
//                 className: 'btn-save',
//                 label: 'Save',
//                 command: 'save-db',
//               },
//             ],
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
//     <div id="blocks" style={{ marginBottom: '10px' }}></div>
      
//       <div ref={editorRef} id="gjs" style={{ height: '100vh' }} />
//       // <div className="panel__top"></div>
//       // <div className="panel__basic-actions"></div>
//       // <div ref={editorRef} id="gjs" style={{ height: '100vh' }} />
//     </>
//   );
// };

// export default ThemeEditor;


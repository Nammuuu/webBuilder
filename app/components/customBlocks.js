
// import  '../../styles/custom-editor.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
const customBlocks = [
  {
    id: 'header',
    label: `<div>
    <i class="fas fa-heading"></i>
    <span>Header</span>
  </div>`,

    attributes: { class:'gjs-block-header' },
    content: `<header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>`,
  },
  {
    id: 'footer',
    label: `<div>
              <i class="fas fa-shoe-prints"></i>
              <span>Footer</span>
            </div>`,

    attributes: { class:'gjs-block-footer' },
    content: `<footer>
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </footer>`,
  },
  {
    id: 'button',
    label: `<div>
              <i class="fas fa-hand-pointer"></i>
              <span>Button</span>
            </div>`,
    content: '<button class="btn">Click me</button>',
  },
  {
    id: 'form',
    label: `<div>
    <i class="fas fa-wpforms"></i>
    <span>Form</span>
  </div>`,
    content: `<form>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <input type="submit" value="Submit">
    </form>`,
  },
  {
    id: 'section',
    label: `<div>
    <i class="fas fa-layer-group"></i>
    <span>Section</span>
  </div>`,
    attributes: { class:'gjs-block-section' },
    content: `<section>
      <h1>This is a simple title</h1>
      <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
    </section>`,
  },
  {
    id: 'text',
    label: `<div>
    <i class="fas fa-font"></i>
    <span>Text</span>
  </div>`,
    content: '<div data-gjs-type="text">Insert your text here</div>',
  },
  {
    id: 'image',
    label: `<div>
    <i class="fas fa-image"></i>
    <span>Image</span>
  </div>`,
    select: true,
    content: { type: 'image' },
    activate: true,
  },
  {
    id: 'grid-2',
    label: `<div>
    <i class="fas fa-th-large"></i>
    <span>2 Columns</span>
  </div>`,

    content: `
      <div class="row">
        <div class="cell">Cell 1</div>
        <div class="cell">Cell 2</div>
      </div>`,
  },
  {
    id: 'accordion',
    label: `<div>
    <i class="fas fa-bars"></i>
    <span>Accordion</span>
  </div>`,
    content: `
      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-header" data-toggle="collapse" data-target="#collapse1">Section 1</div>
          <div id="collapse1" class="collapse">
            <div class="accordion-body">Content for section 1</div>
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-header" data-toggle="collapse" data-target="#collapse2">Section 2</div>
          <div id="collapse2" class="collapse">
            <div class="accordion-body">Content for section 2</div>
          </div>
        </div>
      </div>`,
  },
  {
    id: 'tabs',
    label: 'Tabs',
    content: `
      <div class="tabs">
        <ul class="tab-list">
          <li class="tab-item active" data-tab="#tab1">Tab 1</li>
          <li class="tab-item" data-tab="#tab2">Tab 2</li>
        </ul>
        <div id="tab1" class="tab-content active">Content for tab 1</div>
        <div id="tab2" class="tab-content">Content for tab 2</div>
      </div>`,
  },
  {
    id: 'card',
    label: 'Card',
    content: `
      <div class="card">
        <img src="https://via.placeholder.com/150" class="card-img-top" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`,
  },
  {
    id: 'advanced-form',
    label: `<div>
    <i class="fas fa-file-alt"></i>
    <span>Advanced Form</span>
  </div>`,
    content: `
      <form>
        <div class="form-group">
          <label for="inputEmail">Email address</label>
          <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Password">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="check1">
          <label class="form-check-label" for="check1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>`,
  },
  // Add more complex blocks as needed
];

export { customBlocks };

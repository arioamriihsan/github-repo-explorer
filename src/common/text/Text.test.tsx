import ReactDOM from 'react-dom';
import Text from './Text';

it('renders correct class based on types', () => {
  const paragraph = document.createElement('p');
  ReactDOM.render(<Text type="body">Arifitanto Oktarian</Text>, paragraph);

  expect(paragraph.querySelector('.body')).not.toBeNull();

  ReactDOM.unmountComponentAtNode(paragraph);
});

it('renders tag using string defined in htmlTag props', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Text type="title" htmlTag="p">
      Arifitanto Oktarian
    </Text>,
    div
  );
  const renderedTextRef = div.querySelector('.title') as Element;

  expect(renderedTextRef.tagName.toLowerCase()).toBe('p');

  ReactDOM.unmountComponentAtNode(div);
});

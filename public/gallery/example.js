'use strict';

const nav = document.querySelector('#nav')

if (_GALLERY.do_grid) {
  nav.classList.add('visible');
  let str = '';

  for(let i=0; i<_GALLERY.allTags.length;i++) {
    const tag = _GALLERY.allTags[i];
    const no = _GALLERY.avoidRe ? _GALLERY.avoidRe.test(tag) : false;
    const yes = _GALLERY.findRe ? _GALLERY.findRe.test(tag) : false;
    str += `<li ${no? 'class=avoid': yes? 'class=find' : ''}><a ${
      !no ?
        'href="?find='+encodeURIComponent(tag)
        + (_GALLERY.avoid.length ? 
          '&avoid='+ encodeURIComponent(_GALLERY.avoid.join(',')) + '"' : '"'
          ) : ''
      }>${tag.slice(0,1).toUpperCase() + tag.slice(1)}</a>
      </li>`;
  }
  nav.querySelector('ul').innerHTML = str;

  // kinda hate youtube iframes < - <
  const links = document.querySelectorAll('a');
  links.forEach((el,i)=>{
    if (el.firstChild && el.firstChild.tagName === 'IFRAME' && i+1 < links.length) {
      el.onkeydown = e=> {
        if (!e.shiftKey && e.key === 'Tab') {
          e.preventDefault();
          links[i+1].focus();
        }
      }
    }
    if (!(i-1 < 0) && links[i-1].firstChild && links[i-1].firstChild.tagName === 'IFRAME') {
      el.onkeydown = e=> {
        if (e.shiftKey && e.key === 'Tab') {
          e.preventDefault();
          links[i-1].focus();
        }
      }
    }
  });

}


if(location.search.includes('&noda')) {
  document.querySelectorAll('[name=deviant-art]').forEach(e=>{e.remove();})
  document.querySelectorAll('a').forEach(a=>{
    a.search += '&noda';
  });
}

function toggleNoda() {
  if (location.search.includes('&noda'))
    location.search = location.search.replace(/&noda/g,'');
  else 
    location.search += '&noda';
}
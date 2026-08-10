/* 全局功能：夜间模式开关 + 回到顶部按钮
   所有页面通过 <script src="js/main.js"></script> 引入，
   主题状态保存在 localStorage，跨页面保持一致。 */
(function () {
  var root = document.documentElement;
  var THEME_KEY = 'site-theme';

  /* 1. 应用已保存的主题（避免闪烁，越早越好） */
  try {
    if (localStorage.getItem(THEME_KEY) === 'dark') {
      root.classList.add('dark');
    }
  } catch (e) {}

  /* 2. 构建夜间模式开关，放进导航右侧 */
  function buildToggle() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', '切换夜间模式');
    btn.textContent = root.classList.contains('dark') ? '☀' : '🌙';

    btn.addEventListener('click', function () {
      root.classList.toggle('dark');
      var isDark = root.classList.contains('dark');
      btn.textContent = isDark ? '☀' : '🌙';
      try {
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      } catch (e) {}
    });
    return btn;
  }

  var nav = document.querySelector('.nav');
  if (nav) {
    var ul = nav.querySelector('ul');
    if (ul) {
      var li = document.createElement('li');
      li.appendChild(buildToggle());
      ul.appendChild(li);
    } else {
      nav.appendChild(buildToggle());
    }
  }

  /* 3. 回到顶部按钮 */
  var top = document.createElement('button');
  top.type = 'button';
  top.id = 'back-top';
  top.setAttribute('aria-label', '回到顶部');
  top.textContent = '↑';
  document.body.appendChild(top);

  function onScroll() {
    if (window.scrollY > 300) top.classList.add('show');
    else top.classList.remove('show');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  top.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

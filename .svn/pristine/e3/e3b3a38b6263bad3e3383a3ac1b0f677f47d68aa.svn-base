/**
 * HTML5 LocalStorage 本地存储
 * @author yanghc
 * @param window
 * @param localStorage
 * @param undefined
 */
(function(window, localStorage, undefined) {
	var LS = {
		set : function(key, value) {
			// 在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
			// 这时一般在setItem之前，先removeItem()就ok了
			if (this.get(key) !== null)
				this.remove(key);
			localStorage.setItem(key, value);
		},
		// 查询不存在的key时，有的浏览器返回undefined，这里统一返回null
		get : function(key) {
			var v = localStorage.getItem(key);
			return v === undefined ? null : v;
		},
		setObj : function(key, data) {
			// 将 Object 转换为 JSON 字符串
			var json = JSON.stringify(data);
			//console.log("json:"+json);
			localStorage.setItem(key, json);
			//console.log("localStorage:"+localStorage);
		},
		getObj : function(key) {
			var str = localStorage.getItem(key);
			// 将 JSON 字符串转换为 Object
			var data = JSON.parse(str);
			return data === undefined ? null : data;
		},
		remove : function(key) {
			localStorage.removeItem(key);
		},
		clear : function() {
			localStorage.clear();
		},
		each : function(fn) {
			var n = localStorage.length, i = 0, fn = fn || function() {
			}, key;
			for (; i < n; i++) {
				key = localStorage.key(i);
				if (fn.call(this, key, this.get(key)) === false)
					break;
				// 如果内容被删除，则总长度和索引都同步减少
				if (localStorage.length < n) {
					n--;
					i--;
				}
			}
		}
	}, j = window.jQuery, c = window.Core;
	// 扩展到相应的对象上
	window.LS = window.LS || LS;
	// 扩展到其他主要对象上
	if (j)
		j.LS = j.LS || LS;
	if (c)
		c.LS = c.LS || LS;
})(window, window.localStorage);


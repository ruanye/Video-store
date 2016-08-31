/**
 * HTML5 SessionStorage 本地存储
 * @author yanghc
 * @param window
 * @param sessionStorage
 * @param undefined
 */
(function(window, sessionStorage, undefined) {
	var SS = {
		set : function(key, value) {
			if (this.get(key) !== null)
				this.remove(key);
			sessionStorage.setItem(key, value);
		},
		// 查询不存在的key时，有的浏览器返回undefined，这里统一返回null
		get : function(key) {
			var v = sessionStorage.getItem(key);
			return v === undefined ? null : v;
		},
		setObj : function(key, data) {
			// 将 Object 转换为 JSON 字符串
			var json = JSON.stringify(data);
			//console.log("json:"+json);
			sessionStorage.setItem(key, json);
			//console.log("sessionStorage:"+sessionStorage);
		},
		getObj : function(key) {
			var str = sessionStorage.getItem(key);
			// 将 JSON 字符串转换为 Object
			var data = JSON.parse(str);
			return data === undefined ? null : data;
		},
		remove : function(key) {
			sessionStorage.removeItem(key);
		},
		clear : function() {
			sessionStorage.clear();
		},
		each : function(fn) {
			var n = sessionStorage.length, i = 0, fn = fn || function() {
			}, key;
			for (; i < n; i++) {
				key = sessionStorage.key(i);
				if (fn.call(this, key, this.get(key)) === false)
					break;
				// 如果内容被删除，则总长度和索引都同步减少
				if (sessionStorage.length < n) {
					n--;
					i--;
				}
			}
		}
	}, j = window.jQuery, c = window.Core;
	// 扩展到相应的对象上
	window.SS = window.SS || SS;
	// 扩展到其他主要对象上
	if (j)
		j.SS = j.SS || SS;
	if (c)
		c.SS = c.SS || SS;
})(window, window.sessionStorage);

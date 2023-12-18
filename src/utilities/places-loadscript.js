export default function loadScript(url) {
	const script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	script.async = true;
	document.body.appendChild(script);
}

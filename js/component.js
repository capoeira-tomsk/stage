function component(url) {
    return fetch(url)
        .then(result => {
            if (!result.ok) throw new Error(`${result.statusText} ${url}`);
            return result.text().then(text => {
                // const time = performance.now();
                const template0 = text.indexOf('<template>') + '<template>'.length;
                const template1 = text.lastIndexOf('</template>');
                const script0 = text.indexOf('<script>') + '<script>'.length;
                const script1 = text.lastIndexOf('</script>');
                let component = {};
                if (script0 >= 0 && script1 >= 0) {
                    const script = text.slice(script0, script1).replace('export default', 'return');
                    component = Function(script)();
                }
                if (template0 >= 0 && template1 >= 0) {
                    component.template = text.slice(template0, template1);
                }
                // console.log(performance.now() - time);
                return component;
            });
        })
}

function scrollToHash() {
    requestAnimationFrame(() => {
        const hash = (location.hash || '').replace('#', '');
        if (hash) {
            const section = document.getElementById(hash);
            if (section) {
                const rect = section.getBoundingClientRect();
                window.scrollTo({top: document.documentElement.scrollTop + rect.top});
            }
        }
    });
}
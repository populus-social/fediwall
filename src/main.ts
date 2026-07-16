/**
    Copyright (C) 2025  Marcel Hellkamp
    Copyright (C) 2023  Gesellschaft für wissenschaftliche Datenverarbeitung mbH Göttingen

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import { createApp } from 'vue'
import { VueMasonryPlugin } from 'vue-masonry';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import DOMPurify from 'dompurify';

// Post content (mentions/hashtags/URLs) arrives as raw anchor tags from the
// Mastodon API, which does not set target="_blank" itself. Force it here so
// every sanitized anchor opens in a new tab instead of navigating away from
// the wall. Registered on this singleton so sources.ts's own sanitize() call
// picks it up directly; see the app.use(VueDOMPurifyHTML, ...) call below for
// why the directive needs an extra step to see it too.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.hasAttribute('href')) {
        node.setAttribute('target', '_blank')
        node.setAttribute('rel', 'noopener noreferrer')
    }
})

// Register fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
library.add(faGear, faSpinner, faTriangleExclamation)

import App from '@/App.vue'
const app = createApp(App)

app.use(VueMasonryPlugin)
app.component("icon", FontAwesomeIcon)
// vue-dompurify-html creates its own DOMPurify instance internally by default
// (a separate object from the singleton imported above), so the hook above
// wouldn't reach it without this: pass the already-hooked singleton directly
// as the instance factory, so v-dompurify-html (Card.vue's post.content) uses
// the exact same hooked instance as sources.ts's manual sanitize() call.
app.use(VueDOMPurifyHTML, {
    defaults: {
        FORBID_TAGS: ['style'],
        FORBID_ATTR: ['style']
    }
}, () => DOMPurify)
app.mount('#app')

/* window.js
 *
 * Copyright 2024 Loki Calmito
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import GObject from 'gi://GObject';
import Adw from 'gi://Adw';
import Gdk from 'gi://Gdk';

export const WordWindow = GObject.registerClass({
    GTypeName: 'WordWindow',
    Template: 'resource:///monster/loki/nili/word.ui',
    InternalChildren: [
      'word_title',
      'word_definition',
      'word_book',
      'word_usage',
      'word_origin',
      'word_commentary',
      'copy_definition_button',
      'toast_overlay',
      ],
}, class WordWindow extends Adw.Window {
    constructor(application, word, word_definition, word_book, word_usage, word_origin, word_commentary ) {
        super({ application });

        this._word_title.label = word;
        this._word_definition.subtitle = word_definition;
        this._word_book.subtitle = word_book;
        this._word_usage.subtitle = word_usage;
        this._word_origin.subtitle = word_origin;
        this._word_commentary.subtitle = word_commentary;

        this._copy_definition_button.connect("clicked", () => {
          let display = Gdk.Display.get_default();
          let clipboard = display.get_clipboard();

          clipboard.set(word_definition);

          const toast = new Adw.Toast({
            title: _('Definition copied to clipboard'),
            timeout: 2,
          });
          this._toast_overlay.add_toast(toast);
        });
    };
});


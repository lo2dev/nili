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
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import { WordWindow } from './word.js';

export const NiliWindow = GObject.registerClass({
    GTypeName: 'NiliWindow',
    Template: 'resource:///monster/loki/nili/window.ui',
    InternalChildren: [
      'button_search',
      'searchbar',
      'searchentry',
      'words_list',
      ],
}, class NiliWindow extends Adw.ApplicationWindow {
    constructor(application) {
        super({ application });

        this._button_search.connect("clicked", () => {
          this._searchbar.search_mode_enabled = !this._searchbar.search_mode_enabled;
        });

        const decoder = new TextDecoder();
        const words_file = Gio.File.new_for_uri("resource:///monster/loki/nili/words.json");
        const [, data] = words_file.load_contents(null);
        const parsed_data = JSON.parse(decoder.decode(data));

        for (let word in parsed_data) {
          const row = new Adw.ActionRow({
            title: parsed_data[word].word,
            subtitle: parsed_data[word].translations.eng.definitions,
          });

          const activate_widget = new Gtk.Button({
            label: "Word Details",
            tooltip_text: "Word Details",
            icon_name: "go-next-symbolic",
            has_frame: false,
            valign: Gtk.Align.CENTER,
          });

          row.add_suffix(activate_widget);
          row.set_activatable_widget(activate_widget);

          let full_origin;
          if (!parsed_data[word].etymology[0].word) {
            full_origin = parsed_data[word].source_language;
          } else {
            full_origin = parsed_data[word].source_language + ": " + parsed_data[word].etymology[0].word;
          }

          activate_widget.connect("clicked", () => {
            const word_window = new WordWindow(
                application,
                parsed_data[word].word,
                parsed_data[word].translations.eng.definitions,
                parsed_data[word].book,
                parsed_data[word].usage_category,
                full_origin,
                parsed_data[word].translations.eng.commentary,
              );

            word_window.set_transient_for(this);
            word_window.present();
          });

          this._words_list.append(row);

          //this._words_list.set_filter_func(filter(row));
        }

        /*let results_count;

        this._searchentry.connect("search-changed", () => {
          results_count = -1;
          listbox.invalidate_filter();
          if (results_count === -1) stack.visible_child = status_page;
          else if (searchbar.search_mode_enabled) stack.visible_child = search_page;
        }); */

    }
});

/*export function filter(row) {
  const re = new RegExp(this._searchentry.text, "i");
  const match = re.test(row.title);
  if (match) results_count++;
  return match;
} */


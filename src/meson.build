pkgdatadir = get_option('datadir') / meson.project_name()
gnome = import('gnome')

blueprints = custom_target('blueprints',
  input: files(
    'window.blp',
    'word.blp',
    'gtk/help-overlay.blp',
  ),
  output: '.',
  command: [find_program('blueprint-compiler'), 'batch-compile', '@OUTPUT@', '@CURRENT_SOURCE_DIR@', '@INPUT@'],
)

src_res = gnome.compile_resources('monster.loki.nili.src',
  'monster.loki.nili.src.gresource.xml',
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
  dependencies: blueprints,
)

data_res = gnome.compile_resources('monster.loki.nili.data',
  'monster.loki.nili.data.gresource.xml',
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
  dependencies: blueprints,
)

bin_conf = configuration_data()
bin_conf.set('GJS', find_program('gjs').full_path())
bin_conf.set('PACKAGE_VERSION', meson.project_version())
bin_conf.set('PACKAGE_NAME', meson.project_name())
bin_conf.set('prefix', get_option('prefix'))
bin_conf.set('libdir', get_option('prefix') / get_option('libdir'))
bin_conf.set('datadir', get_option('prefix') / get_option('datadir'))
bin_conf.set('resource_path', '/monster/loki/nili')

configure_file(
  input: 'monster.loki.nili.in',
  output: 'monster.loki.nili',
  configuration: bin_conf,
  install: true,
  install_dir: get_option('bindir')
)

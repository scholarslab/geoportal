require 'capistrano/ext/multistage'
require "bundler/capistrano"

set :stages, %w(staging production)
set :default_stage, "staging"

set :application, "geoportal"
set :repository,  "git://github.com/scholarslab/geoportal.git"

set :branch, "sinatra"

set :scm, :git

set :deploy_to, "/usr/local/projects/#{application}"
set :deploy_via, :remote_cache

default_run_options[:pty] = true

set :keep_releases, 3

after "deploy:setup", "chown_to_gis", "fix_file_permissions"
after "deploy:update", "chown_to_gis", "fix_file_permissions"
after "deploy:restart", "deploy:cleanup"

desc "Change to the proper group"
task :chown_to_gis, :roles => :app do
  sudo "chgrp -R gis_admins #{deploy_to}"
end

desc "Fix file permissions"
task :fix_file_permissions,:roles => :app, :except => {:no_release => true} do
  sudo "chmod -R g+rw #{shared_path}"
end

# If you are using Passenger mod_rails uncomment this:
 namespace :deploy do
   task :start do ; end
   task :stop do ; end
   task :restart, :roles => :app, :except => { :no_release => true } do
     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
   end
 end

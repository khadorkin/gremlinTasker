# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = true

    # Customize the amount of memory on the VM:
    vb.memory = "1024"
  end

  # Network items
  config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network "forwarded_port", guest: 5432, host: 5432
  config.vm.network "private_network", ip: "192.168.50.4"

  # Shell Provision
  config.vm.provision "shell", inline: <<-SHELL
    # NodeJS
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get update
    sudo apt-get install -y nodejs

    # Some global NPM modules
    npm install -g webpack
    npm install -g sequelize
    npm install -g grunt-cli

    # Postgresql
    sudo apt-get install -y postgresql postgresql-contrib postgresql-client
    sudo -u postgres createdb gremlin_tasker
    sudo -u postgres createdb gremlin_tasker_test
    sudo -u postgres psql -c "alter user postgres with password 'password';"

    # Redis
    sudo apt-get install -y build-essential
    sudo apt-get install tcl8.5
    wget http://download.redis.io/releases/redis-stable.tar.gz
    tar xzf redis-stable.tar.gz
    cd redis-stable
    make
    make test
    sudo make install
    cd utils
    sudo ./install_server.sh
    sudo service redis_6379 start
  SHELL
end

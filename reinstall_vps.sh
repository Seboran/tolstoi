#!/bin/bash

# Script to reinstall essential software on a VPS
# Includes: Node.js, PM2, Nginx, UFW, Certbot

set -e  # Exit on error

echo "Starting VPS software reinstallation..."

# Update system packages
echo "Updating system packages..."
apt update
apt upgrade -y

# Install essential tools
echo "Installing essential tools..."
apt install -y curl git wget gnupg2 software-properties-common apt-transport-https ca-certificates

# Install Node.js
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt install -y nodejs

# Verify Node.js installation
node -v
npm -v

# Install pnpm
echo "Installing pnpm..."
npm install -g pnpm

# Install Turbo
echo "Installing Turbo..."
npm install -g turbo

# Install PM2
echo "Installing PM2..."
npm install -g pm2
pm2 startup

# Install Nginx
echo "Installing Nginx..."
apt install -y nginx

# Ensure proper Nginx directory structure exists
echo "Setting up Nginx configuration directories..."
mkdir -p /etc/nginx/sites-available
mkdir -p /etc/nginx/sites-enabled

# Ensure the include directive exists in nginx.conf
if ! grep -q "include /etc/nginx/sites-enabled/\*.conf;" /etc/nginx/nginx.conf; then
  echo "Updating Nginx main configuration to include sites-enabled..."
  sed -i '/http {/a \	include /etc/nginx/sites-enabled/*.conf;' /etc/nginx/nginx.conf
fi

# Enable and start Nginx
systemctl enable nginx
systemctl start nginx

# Install UFW (Uncomplicated Firewall)
echo "Installing and configuring UFW..."
apt install -y ufw

# Configure basic UFW rules
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https

# Don't enable UFW yet - let the user do this manually after checking the rules
echo "UFW installed but not enabled. Enable manually with 'ufw enable' after verifying rules."

# Install Certbot
echo "Installing Certbot..."
apt install -y certbot python3-certbot-nginx

echo ""
echo "Installation complete!"
echo ""
echo "Summary of installed software:"
echo "------------------------------"
echo "Node.js: $(node -v)"
echo "NPM: $(npm -v)"
echo "pnpm: $(pnpm --version)"
echo "Turbo: $(turbo --version)"
echo "PM2: $(pm2 -v)"
echo "Nginx: $(nginx -v 2>&1)"
echo "UFW: $(ufw --version)"
echo "Certbot: $(certbot --version)"
echo ""
echo "Next steps:"
echo "1. Review and enable UFW with 'sudo ufw enable'"
echo "2. Configure Nginx for your sites:"
echo "   - Create site configs in /etc/nginx/sites-available/yoursite.conf"
echo "   - Enable sites with: ln -s /etc/nginx/sites-available/yoursite.conf /etc/nginx/sites-enabled/"
echo "   - Test configuration with: nginx -t"
echo "   - Reload Nginx with: systemctl reload nginx"
echo "3. Set up SSL certificates with Certbot using 'sudo certbot --nginx'"
echo "4. Configure PM2 for your Node.js applications"
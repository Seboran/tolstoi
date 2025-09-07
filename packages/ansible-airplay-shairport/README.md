# Ansible Playbook: Raspberry Pi AirPlay (shairport-sync)

Automates the steps from the article "Comment rendre n'importe quelle enceinte compatible Airplay" to turn a Raspberry Pi + any speakers into an AirPlay receiver using `shairport-sync`.

## What this playbook does

1. Updates apt cache (optionally upgrades packages).
2. Installs required packages: `shairport-sync`, `alsa-utils`.
3. (Optional) Configures a custom output audio device (e.g. USB DAC) in `/etc/shairport-sync.conf`.
4. (Optional) Sets the advertised AirPlay name.
5. Ensures the service is enabled & started.
6. Shows you the list of ALSA playback devices (`aplay -l`) so you can pick one on first run.
7. (Optional) Sets mixer volume with `amixer` (best‑effort; ignored if control missing).

## Requirements

* Raspberry Pi OS Lite (or Debian-based) already flashed
* SSH access (e.g. user `pi`)
* Python installed on target (Raspberry Pi OS ships with it)
* Control machine with Ansible ≥ 2.13

## Files Overview

* `ansible.cfg` – Local Ansible config (color, host key checking, roles path)
* `inventory.ini` – Example inventory (edit host/IP)
* `group_vars/all.yml` – Default variables you can override
* `playbook.yml` – Entry playbook
* `roles/shairport/` – Role implementing the setup

## Choosing the audio device

Run once without overriding `shairport_output_device`. The play outputs the result of `aplay -l` (look for a line like `card 1: M2X2 ...`).

Then re-run with:

```bash
ansible-playbook -i inventory.ini playbook.yml \\
  -u pi -k -K \\
  -e shairport_output_device=M2X2 \\
  -e shairport_friendly_name="Studio Focal" \\
  -e shairport_set_volume=true
```

Meaning of variables:

| Variable | Purpose | Default |
|----------|---------|---------|
| `shairport_output_device` | ALSA card name (without hw:) | "" (skip config) |
| `shairport_friendly_name` | AirPlay advertised name | Hostname |
| `shairport_set_volume` | Whether to force a mixer volume | false |
| `shairport_volume_percent` | Percentage for `amixer` | 100 |
| `shairport_upgrade` | If true run safe dist upgrade | false |

If you pass `shairport_output_device=M2X2`, the role writes: `output_device = "hw:M2X2"`.

## Quick Start

1. Edit `inventory.ini` with your Pi IP / hostname.
1. (Optional) First run (discover devices):

```bash
ansible-playbook -i inventory.ini playbook.yml -u pi -k -K
```

1. Note the desired card from the `aplay -l` output.
1. Re-run with variables (see command above).
1. Select the AirPlay target from your Apple device (it should appear with the chosen friendly name).

## Idempotence & Safety

* Config changes only when variables provided.
* Original `/etc/shairport-sync.conf` is backed up once to `/etc/shairport-sync.conf.orig`.
* Uses `lineinfile` instead of replacing the whole config to minimize risk.

## Extending

Potential improvements:

* Template a minimal config instead of patching lines
* Expose passworded AirPlay (shairport-sync supports it)
* Build a ready-made Raspberry Pi image (future idea from the article)

## License

Uses repository root license.

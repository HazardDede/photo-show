# photo-show

> A dockerized Photo Diashow

Just mount your photos to `/photos` and enjoy!

## Make it run

``` bash
# build docker
npm run docker

# run the docker and serve locally @ port 8080
docker run --name photo-show \
    -it \
    --rm \
    -v /Users/dmuth/photo:/photos \
    -p 8080:80 \
    photo-show

# run the docker in calendar mode
docker run --name photo-show \
    -v /Users/dmuth/photo:/photos \
    -p 8080:80 \
    -d \
    -e CALENDAR_MODE=yes \
    photo-show
```

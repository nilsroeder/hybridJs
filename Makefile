# hybridJs Makefile
# 2010
#

SRC_DIR = src
BUILD_DIR = build
DIST_DIR = dist

RHINO ?= java -jar ${BUILD_DIR}/js.jar
COMPILER = ${BUILD_DIR}/google-compiler-20100917.jar
MINJAR ?= java -jar ${COMPILER}

BASE_FILES = ${SRC_DIR}/hybridBlit.js\
	${SRC_DIR}/hybridGame.js\
	${SRC_DIR}/hybridLoader.js\
	${SRC_DIR}/hybridMove.js\
	${SRC_DIR}/hybridResourceManager.js\
	${SRC_DIR}/hybridScreen.js\
	${SRC_DIR}/hybridSound.js\
	${SRC_DIR}/hybridSprite.js\
	${SRC_DIR}/hybridTile.js\
	${SRC_DIR}/hybridTrigger.js

MODULES = ${SRC_DIR}/copyright.js\
	${BASE_FILES}

HYBRID = ${DIST_DIR}/hybrid.js
HYBRID_MIN = ${DIST_DIR}/hybrid.min.js

HYBRID_VER = $(shell cat version.txt)
VER = sed "s/@VERSION/${HYBRID_VER}/"

DATE=$(shell git log -1 --pretty=format:%ad)

all: hybrid min lint
	@@echo "hybridJs build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

ifeq ($(strip $(V)),0)
verbose = --quiet
else ifeq ($(strip $(V)),1)
verbose =
else
verbose = --verbose
endif

hybrid: ${HYBRID}

${HYBRID}: ${MODULES} ${DIST_DIR}
	@@echo "Building" ${HYBRID}

	@@cat ${MODULES} | \
		sed 's/Date:./&'"${DATE}"'/' | \
		${VER} > ${HYBRID};

lint: ${HYBRID}
	@@echo "Checking hybridJs against JSLint..."
	@@${RHINO} build/jslint-check.js

min: ${HYBRID_MIN}

${HYBRID_MIN}: ${HYBRID}
	@@echo "Building" ${HYBRID_MIN}

	@@head -9 ${HYBRID} > ${HYBRID_MIN}
	@@${MINJAR} --js ${HYBRID} --warning_level QUIET --js_output_file ${HYBRID_MIN}.tmp
	@@cat ${HYBRID_MIN}.tmp >> ${HYBRID_MIN}
	@@rm -f ${HYBRID_MIN}.tmp

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

.PHONY: all hybrid lint min clean
